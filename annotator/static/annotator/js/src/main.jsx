import React, { useEffect, useState, useRef } from "react";
import { createRoot } from "react-dom/client";
import * as markerjs2 from "markerjs2";
import Glide from "@glidejs/glide";

let imageData = []; // Global variable to store fetched image data

function fetchData() {
  return fetch("/processed-images/")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((response) => {
      imageData = response.data;
      updateImageGrid();
    })
    .catch((error) => console.error("Error fetching data:", error));
}

function createElement(tag, attributes = {}, children = []) {
  const element = document.createElement(tag);
  Object.keys(attributes).forEach((key) => {
    element.setAttribute(key, attributes[key]);
  });
  children.forEach((child) => {
    if (typeof child === "string") {
      element.appendChild(document.createTextNode(child));
    } else {
      element.appendChild(child);
    }
  });
  return element;
}

function updateImageGrid() {
  const gridContainer = document.getElementById("grid");
  gridContainer.innerHTML = ""; // Clear existing grid

  if (imageData.length === 0) {
    const placeholder = createElement(
      "div",
      { class: "text-center text-gray-500" },
      ["Annotated images will show up here"]
    );
    gridContainer.appendChild(placeholder);
    return;
  }

  const grid = createElement("div", {
    class: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5",
  });
  imageData.forEach((image) => {
    const imgElement = createElement("img", {
      src: image.edited_image,
      alt: image.alt || `Image ${image.id}`,
      "data-reference": image.reference,
      "data-key": image.id,
      class: "object-cover w-full h-full cursor-pointer",
    });
    imgElement.addEventListener("click", handleImageClick);

    const gridItem = createElement("div", { class: "cursor-pointer" }, [
      imgElement,
    ]);
    grid.appendChild(gridItem);
  });

  gridContainer.appendChild(grid);
}

function handleImageClick(event) {
  const clickedImage = event.target;
  const mainImage = document.getElementById("myImg");
  mainImage.setAttribute("src", clickedImage.getAttribute("src"));
  mainImage.setAttribute("alt", clickedImage.getAttribute("alt"));
  mainImage.setAttribute("data-key", clickedImage.getAttribute("data-key"));
  mainImage.setAttribute(
    "data-reference",
    clickedImage.getAttribute("data-reference")
  );
}

document.addEventListener("DOMContentLoaded", () => {
  // Initial fetch of image data
  fetchData();

  // Initialize Glide for the carousel
  new Glide(".glide", {
    type: "carousel",
    startAt: 0,
    perView: 3,
    gap: 8,
    breakpoints: {
      640: {
        perView: 1,
      },
      1024: {
        perView: 2,
      },
    },
  }).mount();

  const images = document.querySelectorAll("ul.glide__slides img");

  images.forEach((image) => {
    image.addEventListener("click", (event) => {
      const clickedImage = event.target;

      // Update the main image inside the canvas div
      const imgCanvas = document.getElementById("myImg");
      imgCanvas.setAttribute("src", clickedImage.getAttribute("src"));
      imgCanvas.setAttribute("alt", clickedImage.getAttribute("alt"));
      imgCanvas.setAttribute("data-key", clickedImage.getAttribute("data-key"));
    });
  });

  const markerImage = document.querySelector("#myImg");
  const markerArea = new markerjs2.MarkerArea(markerImage);

  markerArea.addEventListener("render", (event) => {
    const base64String = event.dataUrl;
    const base64Image = base64String.split(",")[1];
    const alreadyAnnotated = markerImage.getAttribute("data-reference");

    const csrfToken = document.querySelector(
      'input[name="csrfmiddlewaretoken"]'
    )?.value;

    const formData = new FormData();
    formData.append("csrfmiddlewaretoken", csrfToken);
    formData.append("annotatedImage", base64Image);
    formData.append("reference", alreadyAnnotated || false);
    formData.append(
      "reference_id",
      parseInt(markerImage.getAttribute("data-key"), 10)
    );

    fetch("/processed-images/", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((val) => {
        console.log("Saved image:", val);

        // Fetch updated data and update the grid
        fetchData();
      });

    markerImage.setAttribute("src", event.dataUrl);
  });

  markerImage.addEventListener("click", () => {
    markerArea.show();
  });
});
