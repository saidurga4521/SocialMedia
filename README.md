## Project Description

- This project is a social media application that allows users to interact with each other by creating and sharing posts. Users can upload content, like posts, and share their thoughts through comments. Additionally, I implemented features for profile management, enabling users to update their profile information directly. Users can also edit their previously shared posts, making the platform more dynamic and user-friendly.

## Functionalities

### 1.Authentication:

#### a.Login:

         - Maintains form state (email, password) and validates inputs using regex and length checks.

         - Updates input values and errors dynamically on each change.

         - On form submit, calls the login API, stores token, sets user context, and redirects to home.

         - Displays toast messages for success/error and includes links to "Forget Password" and "Sign up".

#### b.signUp:

         - Maintains user input state (name, email, password) and validates each field on change using validateData().

         - On form submission, re-validates all fields and checks if any are empty before sending data to the server.

         - Calls SignUpForm() API, shows success/error toasts, stores token in localStorage, sets user context, and redirects to home.

         - Displays error messages below each input field and provides a redirect link for users who already have an account.

