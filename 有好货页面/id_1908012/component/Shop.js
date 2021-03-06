import { create } from "./create.js";
import Div from "./Div.js";
import style from "./shop.css";
import fansIcon from "./image/fans_icon.png";

const PROPERTY_SYMBOL = Symbol("property");
const ATTRIBUTE_SYMBOL = Symbol("attribute");
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");


// let styleElement = document.createElement("style");
// styleElement.innerHTML = css;
// document.getElementsByTagName("head")[0].appendChild(styleElement);

export default class Shop {
    constructor(config) {
        this[PROPERTY_SYMBOL] = Object.create(null);
        this[ATTRIBUTE_SYMBOL] = Object.create(null);
        this[EVENT_SYMBOL] = Object.create(null);
        this[STATE_SYMBOL] = Object.create(null);

        this[PROPERTY_SYMBOL].children = [];

        this.created();
    }

    appendTo(element) {
        element.appendChild(this.root);
        this.mounted();
    }

    addStyle() {

    }

    created() {
        this.root = document.createElement("div");
        this.root.className = "shop-view";
        this.render().appendTo(this.root);
    }
    mounted() {

    }
    unmounted() {

    }
    update() {

    }


    render() {
        let data = this[ATTRIBUTE_SYMBOL]["data"] || [];
        return <div>
            {
                data.map(item => (
                    <div class='shop'>
                        <div class='shop-header'>
                            <div class='icon'><img src={item.icon} /></div>
                            <div class='fans'><img src={fansIcon} /><span>该店已被{(item.fans / 10000.0).toFixed(0)}万人关注啦</span></div>
                        </div>
                        <div class='shop-banner'>
                            <div class='name-container'>
                                <div class='name'>
                                    {item.name}
                                </div>
                                <div class='promotion'>
                                    {item.promotion}
                                </div>
                            </div>
                            <div class='enter-button'>进店</div>
                        </div>
                        <div class='shop-content'>
                            {item.items.map(i=>(
                                <img src={i.image} />
                            ))}
                        </div>
                    </div>
                    
                ))
            }
        </div>
    }

    get style() {
        return this.root.style;
    }

    appendChild(child) {
        this.children.push(child);
        child.appendTo(this.root);
    }


    get children() {
        return this[PROPERTY_SYMBOL].children;
    }
    getAttribute(name) {
        if (name == "style") {
            return this.root.getAttribute("style");
        }


        return this[ATTRIBUTE_SYMBOL][name]
    }
    setAttribute(name, value) {
        if (name == "style") {
            this.root.setAttribute("style", value);
        }
        if (name == "data") {
            this[ATTRIBUTE_SYMBOL][name] = value;

            this.root.innerHTML = "";
            this.render().appendTo(this.root);

            return value;
        }
        return this[ATTRIBUTE_SYMBOL][name] = value;
    }
    addEventListener(type, listener) {
        if (!this[EVENT_SYMBOL][type])
            this[EVENT_SYMBOL][type] = new Set;
        this[EVENT_SYMBOL][type].add(listener);
    }
    removeEventListener(type, listener) {
        if (!this[EVENT_SYMBOL][type])
            return;
        this[EVENT_SYMBOL][type].delete(listener);
    }
    triggerEvent(type, ...args) {
        if (!this[EVENT_SYMBOL][type])
            return;
        for (let event of this[EVENT_SYMBOL][type])
            event.call(this, ...args);
    }
}