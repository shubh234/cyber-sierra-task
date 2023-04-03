import useDisableScroll from "./useDisableScroll";

export default function Modal({
  handleModalClose,
  photo,
}: {
  handleModalClose: any;
  photo: any;
}) {
  useDisableScroll();

  return (
    <div className="modal" key={photo.id}>
      <img src={photo.url} alt={photo.alt_description} />
      <button onClick={handleModalClose}>Back</button>
    </div>
  );
}
