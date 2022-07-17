/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{
  'use strict';

  const select = {
    templateOf: {
      menuProduct: '#template-menu-product',
    },
    containerOf: {
      menu: '#product-list',
      cart: '#cart',
    },
    all: {
      menuProducts: '#product-list > .product',
      menuProductsActive: '#product-list > .product.active',
      formInputs: 'input, select',
    },
    menuProduct: {
      clickable: '.product__header',
      form: '.product__order',
      priceElem: '.product__total-price .price',
      imageWrapper: '.product__images',
      amountWidget: '.widget-amount',
      cartButton: '[href="#add-to-cart"]',
    },
    widgets: {
      amount: {
        input: 'input[name="amount"]',
        linkDecrease: 'a[href="#less"]',
        linkIncrease: 'a[href="#more"]',
      },
    },
  };

  const classNames = {
    menuProduct: {
      wrapperActive: 'active',
      imageVisible: 'active',
    },
  };

  const settings = {
    amountWidget: {
      defaultValue: 1,
      defaultMin: 1,
      defaultMax: 9,
    }
  };

  const templates = {
    menuProduct: Handlebars.compile(document.querySelector(select.templateOf.menuProduct).innerHTML),
  };
  
  class Product {
    constructor(){
      const thisProduct = this;
      
      console.log('new Product:', thisProduct);
    }
  }
    

  const app = {
    
    
    initMenu: function(){
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
      const testProduct = new Product();
=======
=======
    const testProduct = new Product();
>>>>>>> 55d794308c7f6ae8d628e6d0e7b5ff9b6c8e2e93
    const thisApp = this;
      
    console.log('thisApp.data:', thisApp.data);
>>>>>>> a6aa718738ccdbc2b2454671ee5a78ef60eace70
    
      console.log('testProduct:', testProduct);
    },
=======
      const testProduct = new Product();
      
    console.log('testProduct:', testProduct);
  },
>>>>>>> d9c3702e1f8c94a8867d534d3590ef48873a6460
    
    initData: function(){
      const thisApp = this;
      
      thisApp.data = dataSource;
    },
    
    init: function(){
      const thisApp = this;
      console.log('*** App starting ***');
      console.log('thisApp:', thisApp);
      console.log('classNames:', classNames);
      console.log('settings:', settings);
      console.log('templates:', templates);
       
<<<<<<< HEAD
<<<<<<< HEAD
      thisApp.initMenu();
=======
  thisApp.initData();
=======
>>>>>>> d9c3702e1f8c94a8867d534d3590ef48873a6460
  thisApp.initMenu();
>>>>>>> a6aa718738ccdbc2b2454671ee5a78ef60eace70
      
    },
  };
  
  app.init();
 
}
