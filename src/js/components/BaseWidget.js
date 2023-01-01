class BaseWidget {
  constructor(wrapperElement, initialValue){
    const thisWidget = this;

    thisWidget.dom = {};
    thisWidget.dom.wrapper = wrapperElement;

    thisWidget.correctValue = initialValue;
  }

  get value(){
    const thisWidget = this;

    return thisWidget.correctValue;
  }

  set value(value) {
    const thisWidget = this;

    const newValue = thisWidget.parseValue(value); //pareseInt konwertuje string (np. '10') na liczbe (np. 10)

    /* TO DO: Add validation */
    if(newValue !== thisWidget.correctValue && thisWidget.isValid(newValue)) {
      thisWidget.correctValue = newValue;
    }

    thisWidget.announce();
    thisWidget.renderValue();
  }

  setValue(value){
    const thisWidget = this;

    thisWidget.value = value;
  }

  parseValue(value){
    return parseInt(value);
  }

  isValid(value){
    return !isNaN(value);
  }

  renderValue(){
    const thisWidget = this;

    thisWidget.dom.wrapper.innerHTML = thisWidget.value;
  }

  announce(){
    const thisWidget = this;

    //const event = new Event('updated');
    const event = new CustomEvent('updated', {
      bubbles: true //babelkowanie - event jest emitowany nie tylko na tym elemencie ale tezna rodzicu i dziecku
    });
    thisWidget.dom.wrapper.dispatchEvent(event);
  }
}

export default BaseWidget;
