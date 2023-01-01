import {select, classNames, templates} from './../settings.js';
import utils from './../utils.js';
import AmountWidget from './AmountWidget.js';

class Product {
  constructor(id, data) {
    const thisProduct = this;

    thisProduct.id = id;
    thisProduct.data = data;

    thisProduct.renderInMenu();
    thisProduct.getElements();
    thisProduct.initAccordion();
    thisProduct.initOrderForm();
    thisProduct.initAmountWidget();
    thisProduct.processOrder();
  }

  renderInMenu() {
    const thisProduct = this;

    /* [DONE] generate HTML based on template - wygenerowac kod HTML pojedynczego produktu*/
    const generateHTML = templates.menuProduct(thisProduct.data);

    /* [DONE] create element using utils.createElementFromHTML - stworzyc element DOM na podstawie kodu produktu*/
    thisProduct.element = utils.createDOMFromHTML(generateHTML); //obiekt utils znajduje sie w functions.js

    /* find menu container - znajdz na stronie kontener menu */
    const menuContainer = document.querySelector(select.containerOf.menu);

    /* add element to menu - wstaw stworzony element DOM do znalezionego kontenera */
    menuContainer.appendChild(thisProduct.element);
  }

  getElements() {
    const thisProduct = this;

    thisProduct.accordionTrigger = thisProduct.element.querySelector(select.menuProduct.clickable);
    thisProduct.form = thisProduct.element.querySelector(select.menuProduct.form);
    thisProduct.formInputs = thisProduct.form.querySelectorAll(select.all.formInputs);
    thisProduct.cartButton = thisProduct.element.querySelector(select.menuProduct.cartButton);
    thisProduct.priceElem = thisProduct.element.querySelector(select.menuProduct.priceElem);
    thisProduct.imageWrapper = thisProduct.element.querySelector(select.menuProduct.imageWrapper);
    thisProduct.amountWidgetElem = thisProduct.element.querySelector(select.menuProduct.amountWidget);
  }


  initAccordion() {
    const thisProduct = this;

    /* [DONE] find the clickable trigger (the element that should react to clicking) */
    //const clickableTrigger = thisProduct.element.querySelector(select.menuProduct.clickable);

    /* [DONE] START: add event listener to clickable trigger on event click */
    thisProduct.accordionTrigger.addEventListener('click', function(event) {

      /* [DONE] prevent default action for event */
      event.preventDefault();

      /* [DONE] find active product (product that has active class) */
      const activeProduct = document.querySelector(classNames.menuProduct.wrapperActive);

      /* [DONE] if there is active product and it's not thisProduct.element, remove class active from it */
      if(activeProduct != thisProduct.element && activeProduct != null){ //jesli activeProduct "nie jest (!=)" thisProduct i (&&) nie jest(!=) rowne null
        activeProduct.classList.remove('active'); //to zabieramy klase active
      }
      /* [DONE] toggle active class on thisProduct.element */
      thisProduct.element.classList.toggle('active'); //toggle -jak nie ma klasy active - to ja dodaje, a jak jest - to ja zabiera
    });
  }

  initOrderForm() {
    const thisProduct = this;

    thisProduct.form.addEventListener('submit', function(event){
      event.preventDefault();
      thisProduct.processOrder();
    });

    for(let input of thisProduct.formInputs){
      input.addEventListener('change', function(){
        thisProduct.processOrder();
      });
    }

    thisProduct.cartButton.addEventListener('click', function(event){
      event.preventDefault();
      thisProduct.processOrder();
      thisProduct.addToCart();
    });
  }

  processOrder() {
    const thisProduct = this;

    // covertform to object structure e.g. { sauce: ['tomato'], toppings: ['olives', 'redPeppers']
    const formData = utils.serializeFormToObject(thisProduct.form);
    //console.log('formData', formData);

    // set price to default price
    let price = thisProduct.data.price;

    // for every category (param)...
    for(let paramId in thisProduct.data.params) {
    // determine param value, e.g. paramId = 'toppings', param = { label: 'Toppings', type: 'checkboxes'... }
      const param = thisProduct.data.params[paramId];

      // for every option in this category
      for(let optionId in param.options) {
        // determine option value, e.g. optionId = 'olives', option = { label: 'Olives', price: 2, default: true }
        const option = param.options[optionId];

        // check if there is param with a name of paramId in formData and if it includes optionId
        if(formData[paramId] && formData[paramId].includes(optionId)) {
        // check if the option is not default
          if(!option.default == true) {
            // add option price to price variable
            price = option.price + price;
          }
        } else {
        // check if the option is default
          if(option.default == true) {
            // reduce price variable
            price = price - option.price;
          }
        }
        //find images that passt to category-option
        const optionImage = thisProduct.imageWrapper.querySelector('.' + paramId + '-' + optionId); //(paramId + optionId) - nie dziala;
        // check if you found the image
        if(optionImage) {
          if(formData[paramId] && formData[paramId].includes(optionId)) {
            optionImage.classList.add('active'); //add class active
          } else {
            optionImage.classList.remove('active'); //remove class active
          }
        }
      }
    }
    // multiply price by amount
    price *= thisProduct.amountWidget.value;
    // update calculated price in the HTML
    thisProduct.priceSingle = price; //add single price option
    thisProduct.priceElem.innerHTML = price;
    thisProduct.price = price;
  }

  initAmountWidget() {
    const thisProduct = this;

    thisProduct.amountWidget = new AmountWidget(thisProduct.amountWidgetElem);
    thisProduct.amountWidgetElem.addEventListener('updated', function() {
      thisProduct.processOrder();
    });
  }

  addToCart(){
    const thisProduct = this;

    //app.cart.add(thisProduct.prepareCartProduct()); //Dodajemy wszystko co zwraca prepareCartProduct! Zabraklo tylko nawiasow ()!

    const event = new CustomEvent('add-to-cart', {
      bubbles: true,
      detail: {
        product: thisProduct.prepareCartProduct()
      },
    });

    thisProduct.element.dispatchEvent(event);
  }

  prepareCartProduct(){
    const thisProduct = this;

    const productSummary = {
      id: thisProduct.id,
      name: thisProduct.data.name,
      amount: thisProduct.amountWidget.value,
      priceSingle: thisProduct.priceSingle,
      price: thisProduct.price,
      params: thisProduct.prepareCartProductParams(),
    };
    return productSummary;
  }

  prepareCartProductParams() {
    const thisProduct = this;

    const formData = utils.serializeFormToObject(thisProduct.form);
    const params = {};

    // for very category (param)
    for(let paramId in thisProduct.data.params) {
      const param = thisProduct.data.params[paramId];

      // create category param in params const eg. params = { ingredients: { name: 'Ingredients', options: {}}}
      params[paramId] = {
        label: param.label,
        options: {}
      };

      // for every option in this category
      for(let optionId in param.options) {
        const option = param.options[optionId];
        const optionSelected = formData[paramId] && formData[paramId].includes(optionId);

        if(optionSelected) {
          params[paramId].options[optionId] = option.label; // option is selected!
        }
      }
    }

    return params;
  }
}

export default Product;
