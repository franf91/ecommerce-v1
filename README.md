# Ecommerce site

## Purpose

- The purpose of this project is to learn and practice Next JS framework with React. Firebase is used as a backend.

## Description

- This project is a small ecommerce website.
- It holds a total of 40 items divided in 8 categories.
- The categories include camera,computer,furniture,exercise equipment,television.kitchen,automotive, and travel.

## Features

### Login page
- A login page using nextauth for authentication.
### Register page
- A register page to create new users.
### Header Component
- A header component that allows users to signin,view cart navigate to home page and view past orders.
- Only users that are loged in can view cart and orders.
### Navigation Component
- There is a hamburger navigation icon for users to navigate to the different categories.
### Index Page
- A card for each category allowing users to navigate to the specific page
### Category Page
- Each category page has 5 items.Each item has their own page.
### Item Page
- The item page allows users to add item to cart and write a review.
- Only logged in users can add to cart and write review.
- Each item has an averafe rating.Users that write reviews can modify this average rating.
### Review Page
- Users can rate the item 1 - 5 using a star system.
- Users include a review title,nickname(to be displayed) and the review
### Cart Page
- Item quantity can be adjusted using the - and + buttons.
- The item can be removed using the delete button.
- The product total,subtotal, estimated taxes and estimated total are all dynamic based on number of items in cart.
- Continue to checkout button navigates user to checkout page.
### Checkout Page
- Similar to Cart Page but all content is static.
- Place order button that allows users to order items in cart.
### Account Page
- Must click on header item that has user's name.The user's name will always be followed by Hi,. For example : Hi,Brad.
-  In this page user can click on Your Orders to view past orders.
### Order Page
- This page will display all user's orders by date.

## Demo

URL: https://ecommerce-v1-cb5dn4hhg-franf91.vercel.app/
