import Star from "../images/Star.png";

export default function GalleryWindow(props) {
  return (
    <div class="gallery-window">
      <img src={props.pic} className="Window-img" />
      <a className="Window-des">
        <a>
          <img src={Star} width="30px" height="30px" />
          <a class="Window-rating"> {props.rating}</a>
        </a>
        <a class="Window-name">{props.name}</a>
      </a>
      <a class="Window-details">Universe: {props.uni}</a>
    </div>
  );
}
