import Star from "../images/Star.png";

export default function GalleryWindow(props) {
  return (
    <div className="gallery-window">
      <img src={props.pic} className="Window-img" />
      <a className="Window-des">
        <a>
          <img src={Star} width="30px" height="30px" />
          <a className="Window-rating"> {props.rating}</a>
        </a>
        <a className="Window-name">{props.name}</a>
      </a>
      <a className="Window-details">Universe: {props.uni}</a>
    </div>
  );
}
