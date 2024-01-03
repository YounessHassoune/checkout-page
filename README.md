# Checkout Page using Next.js

This project is a checkout page developed using Next.js that enables users to purchase products, adjust quantities, see price changes, and submit their order with payment information and user details.

## Features

- Responsive checkout page layout using Next.js
- Increment/decrement product quantity with a drawer on mobile and a dialog on desktop
- Dynamic price updates based on the selected quantity
- Form submission for payment method and user information
- Validation of user inputs using Zod, React Hook Form, and React Query

## Tech Stack

- Next.js
- React Hook Form and Zod for form management and validation
- React Query for managing remote data fetching

## Getting Started

### Prerequisites

- `Node.js` (v16 or above)
- `pnpm` package manager

### Steps

1. **Clone the repository:**

   ```bash
   git clone <git-repo>
   cd checkout-page
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Set up environment variables:

   Create a .env.local file in the root of the project and add the following:

   ```dotenv
   NEXT_PUBLIC_API_URL="http://localhost:3000/api"
   ```

4. Run the development server:

   ```bash
   pnpm dev
   ```

5. Open http://localhost:3000 to view the project in your browser.

## Live Production Preview

[Live Preview Link](https://checkout-page-murex.vercel.app/checkout)

## Creator

- **Name:** Youness Hassoune
- **website:** [younesshassoune](https://younesshassoune.com/)
