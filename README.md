### Application: Plus Support Front End Developer
###### By: Vinoth Michael Xavier


#### Step 1. Create alternative product template that allows personalization

Created a new file: `sections/product-customizable-template.liquid`.

Added custom form fields for:
* custom text engraving to product (optional line item)
* option to wrap products individually (required line item)

Then applied the new template to products.

---

Next, updated settings in: `config/settings_schema.json`

These settings allow merchants to configure:
- custom text engraving to product
  - toggle on/off
  - set maxlength of engraving text

- option to wrap products individually
  - toggle on/off
  - set custom message for customers

---

#### 2. Create order form with Shopify's AJAX API
Created a new file: `templates/page.order-form.liquid`.
Created new page called 'Order' in Shopify Admin and selected new template.
Added new menu item in navigation to go directly to order form page.

The order form allows customers to:
- add multiple products to cart at once
- select options (including line item properties), quantity for each product
- on click to go directly to checkout

The order form uses jQuery to:
- watch and validate any changes to quantity input
- watch and validate any changes to engraving input
- validate number of products selected
- create and display notifications for errors and loading state
- collect form data, build payloads, and make requests synchronously (API requirement for variants)
- upon successful submission, redirect to the checkout page

---

#### 3. How results were achieved, merchant's guide for functionality
The steps above are for developers to understand the path taken to build this functionality. In scenarios where we make changes to an existing codebase, it's desirable to re-use as much of the assets as possible.

Product data can be accessed in the liquid template, so use liquid to display product data. jQuery is an existing asset, so use jQuery to handle the form validation and submission. There are existing DOM patterns and CSS classes, so reuse as much as possible, only adding something new if an equivalent doesn't already exist.

---

#### Instruction for Merchants:

Hi there, thank you so much for using our custom theme! Itching to try out the new features? Head on over to the [Theme](https://devs-beyond-borders.myshopify.com/admin/themes) page in the Store Admin and click 'Customize'.
Then click on 'Theme Settings' and you'll see the two new options we've recently added:
- Product Packaging
- Custom Engraving

**Product Packaging**:
Toggling this setting on allows customers to opt-in for individually wrapped packages. We hope to help bring down your environmental footprint and packaging costs! This is a required option for customers when turned on. You can also add a custom message to your users to provide more information about this opt-in packaging option you are offering.


**Custom Engraving**: Toggling this setting on allows customers to add a custom engraving text up to a character limit of the merchant's choosing. You can allow for text up to 100 characters in length. This is not a required input field.

These options, when enabled, will appear on the product and bulk order pages. Selected options will be displayed in the cart and checkout pages.

---

#### References
- [Get customization information for products](https://help.shopify.com/en/themes/customization/products/features/get-customization-information-for-products)
- [Configuring theme settings](https://help.shopify.com/en/themes/development/theme-editor/settings-schema)
- [Add an order form to your store](https://help.shopify.com/en/themes/customization/forms/add-order-form)
- [Add, remove, or edit menu items in your online store](https://help.shopify.com/en/manual/sell-online/online-store/menus-and-links/editing-menus)
- [Add, remove, or edit pages](https://help.shopify.com/en/manual/sell-online/online-store/pages)
