import ReactDOM from "react-dom/client";
import Popup from "./view/popup";

const div = document.createElement('div');
document.body.appendChild(div);
div.id = '__FashionnovaApp'

const root = ReactDOM.createRoot(div);

root.render(<Popup />);

