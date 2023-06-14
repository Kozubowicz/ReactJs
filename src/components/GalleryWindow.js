import Star from "../images/Star.png";

export default function GalleryWindow(props) {
  return (
    <div className="gallery-window">
      <img src={props.pic} className="Window-img" />
      <div className="Window-des">
        <div>
          <img src={Star} width="30px" height="30px" />
          <div className="Window-rating"> {props.rating}</div>
        </div>
        <div className="Window-name">{props.name}</div>
      </div>
      <div className="Window-details">Universe: {props.uni}</div>
    </div>
  );
}
