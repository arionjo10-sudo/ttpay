# TTPay

A UPI-style mobile payments app concept for Trinidad and Tobago. Instant TT$ transfers by Pay ID, mobile number or QR, plus bills and activity.

This is a concept design with sample data. It is not a real bank or payment service, and "TTPay" and "First Savannah Bank" are made-up names.

## Run it in VS Code

No install or build step.

1. Open this folder in VS Code (File > Open Folder).
2. Install the **Live Server** extension (Ritwick Dey).
3. Right-click `index.html` and choose **Open with Live Server**.

You can also double-click `index.html` to open it straight in a browser. The fonts load from Google Fonts, so you need an internet connection for the exact typefaces. Without one, it falls back to system fonts.

On a desktop browser the app shows inside a phone frame. On a phone it fills the screen.

## What you can do

- **Home:** balance with show/hide, quick actions, "Send again", spending breakdown, recent activity.
- **Scan & Pay:** tap the viewfinder to simulate scanning a merchant QR.
- **Send / Request:** search contacts, or type a Pay ID (`name@ttpay`) or a +1 868 number. Enter an amount on the keypad (your computer keyboard works too), then any 6-digit PIN.
- **Receipt:** reference number, and your balance and activity update.
- **Bills & recharge:** pay due T&TEC and WASA bills, or pick a category.
- **Activity:** filter by sent, received and bills.
- **Me:** your QR code (decorative, not scannable), Pay ID with copy button, linked accounts.

Your balance and payments are saved in the browser (localStorage). Use **Reset demo data** on the Me tab to start over.

## Project layout

```
index.html        page shell
css/styles.css    all styling; colours and fonts are CSS variables at the top
js/app.js         data, state, screens and actions
```

## Customising

- **Brand colour:** change `--accent` in `css/styles.css`.
- **People, bills, transactions:** edit the sample data at the top of `js/app.js` (`CONTACTS`, `SEED_TXNS`, `BILLS_DUE`, `CATEGORIES`, `SPEND`).
- **Going real:** the payment step lives in `completePayment()` and `submitAmount()` in `js/app.js`. Real payments need a licensed provider and a secure backend, which this project does not include.
