## Shopify Application Tasks

#### 1. Create alternative product template that allows personalization

Created a new file: `sections/product-customizable-template.liquid`

Added custom form fields for:
* custom text engraving to product (optional line item)
* donation to merchant's organization of choice (required line item)
Applied new template to products.

*Learn More*: [Get customization information for products](https://help.shopify.com/en/themes/customization/products/features/get-customization-information-for-products)

Updated settings in: `config/settings_schema.json`

These settings allow merchants to configure:
* custom text engraving to product
  * toggle on/off
* donation to merchant's organization of choice
  * toggle on/off
  * set organization to donate to
  * set percentage of purchase price be added

*Learn More*: [Configuring theme settings](https://help.shopify.com/en/themes/development/theme-editor/settings-schema)

#### 2. Create order form with Shopify's AJAX API
Created a new file: `templates/page.order-form.liquid`.
Created new page in admin and selected new template.
Added new menu item in navigation to go directly to order form.

The order form allows customers to:
* add multiple products to cart at once
* select options (with line item properties), quantity for each product
* on click to go directly to checkout

The order form is a vue component that:
* grabs collection data and converts it to arrays of product/variant objs
* these objs hold all display and input data
* upon submit these objs are used to construct payloads
* payloads are queued up and executed synchonously (variant requirement)
* loading state, then redirected to the cart once the queue is empty

*Learn More*:
* [Add an order form to your store](https://help.shopify.com/en/themes/customization/forms/add-order-form)
* [Add, remove, or edit menu items in your online store](https://help.shopify.com/en/manual/sell-online/online-store/menus-and-links/editing-menus)
* [Add, remove, or edit pages](https://help.shopify.com/en/manual/sell-online/online-store/pages)

#### 3. How results were achieved, merchant's guide for functionality
This `README` is intended for developers to understand the path taken to build this functionality.

Instruction for Merchants:

Hi there, thank you so much for using our custom theme! Itching to try out the new features? Head on over to the [Theme](https://devs-beyond-borders.myshopify.com/admin/themes) page in the Store Admin and click 'Customize'.
Then click on 'Theme Settings' and you'll see the two new options we've recently added:
* Donation
* Custom Engraving

**Donation**
Toggling on the 'Donation' setting allows customers to opt-in on a donation to the charity of your choice.
Just remember to set the organization's name and percentage of profit.
This is a required input field. Customers must select yes or no when this option is availble in order to add the product to the cart.

**Custom Engraving**
Toggling on the 'Custom Engraving' setting allows customers to opt-in on a donation to the charity of your choice.
This is not a required input field.

Options, when selected, will appear along with the item in the cart.
