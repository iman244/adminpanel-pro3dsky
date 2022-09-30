import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import ImageViewer from "react-simple-image-viewer";
import DownloadButton from "../../../../components/Buttons/DownloadButton";
import "./card.css";
import ImageLoading from "../../../../components/ImageLoading";

const CardImg = ({ id, src, desc, isPremium }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  return (
    <>
      <Link to={`${id}`}>
        <div className="imgCard">
          <ImageLoading
            height="220px"
            src={`https://${process.env.REACT_APP_BUCKETS3_NAME}.${process.env.REACT_APP_ENDPOINT_URL}/${src[0]}`}
            alt=""
            className="imgCard"
          />
          <div className="showHide">
            <div className="multiImg">
              <div className="container">
                {src.map((imgSrc, index) => {
                  return (
                    <img
                      key={imgSrc}
                      src={`https://${process.env.REACT_APP_BUCKETS3_NAME}.${process.env.REACT_APP_ENDPOINT_URL}/${imgSrc}`}
                      alt="product"
                      className="multiImg"
                      onClick={(event) => {
                        event.preventDefault();
                        openImageViewer(index);
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          <div className="badge">
            <span className={isPremium ? "pro" : "free"}>
              {isPremium ? "pro" : "free"}
            </span>
          </div>
        </div>
      </Link>
      <Link to={`${id}`}>
        <div className="desc">
          <span className="desc">{desc}</span>
        </div>
      </Link>
      <div className="download">
        <DownloadButton to={`${id}`} />
      </div>
      {isViewerOpen && (
        <ImageViewer
          src={src.map(
            (imgSrc) =>
              `https://${process.env.REACT_APP_BUCKETS3_NAME}.${process.env.REACT_APP_ENDPOINT_URL}/${imgSrc}`
          )}
          currentIndex={currentImage}
          onClose={closeImageViewer}
          disableScroll={false}
          backgroundStyle={{
            backgroundColor: "rgba(0,0,0,0.8)",
            zIndex: "5000",
          }}
          closeOnClickOutside={true}
        />
      )}
    </>
  );
};

export default CardImg;
