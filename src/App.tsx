import { useCallback, useRef, useState } from "react";
import LazyImage from "./LazyImage";
import Modal from "./Modal";
import defaultPhotos from "./photos";

import "./App.css";

function App() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [photos, setPhotos] = useState(defaultPhotos);

  const handlePhotoClick = (index: number) => {
    setSelectedIndex(index);
  };

  const handleModalClose = () => {
    setSelectedIndex(null);
  };

  const handleKeyDown = useCallback(
    (event) => {
      if (selectedIndex === null) {
        return;
      }
      if (event.keyCode === 37) {
        // Left arrow key
        setSelectedIndex((selectedIndex - 1 + photos.length) % photos.length);
      } else if (event.keyCode === 39) {
        // Right arrow key
        setSelectedIndex((selectedIndex + 1) % photos.length);
      } else if (event.keyCode === 27) {
        // ESC key
        setSelectedIndex(null);
      }
    },
    [selectedIndex]
  );

  const fileInputRef = useRef();

  const handleClick = () => {
    // @ts-ignore
    fileInputRef?.current?.click();
  };

  const handleFileSelect = () => {
    // @ts-ignore
    const selectedFile = fileInputRef.current.files[0];
    console.log("Selected file:", selectedFile);
    const fileUrl = URL.createObjectURL(selectedFile);

    setPhotos([
      {
        id: Math.floor(Math.random() * 10000).toString(),
        url: fileUrl,
        alt_description: selectedFile.name,
      },
      ...photos,
    ]);
    // @ts-ignore
    fileInputRef.current.value = '';
  };

  return (
    <div className="App" onKeyDown={handleKeyDown}>
      <div className="photo-gallery">
        {photos.map((p, index) => (
          <button
            className="btn photo-wrapper"
            key={p.id}
            onClick={() => {
              handlePhotoClick(index);
            }}
          >
            <LazyImage src={p.url} alt={p.alt_description} />
          </button>
        ))}
      </div>
      {selectedIndex !== null && (
        <Modal
          photo={photos[selectedIndex]}
          handleModalClose={handleModalClose}
        />
      )}
      {/* Upload Image */}
      <button className="upload-button" onClick={handleClick}>
        +
      </button>
      <input
        type="file"
        className="display-none"
        ref={fileInputRef}
        onChange={handleFileSelect}
      />
    </div>
  );
}

export default App;
