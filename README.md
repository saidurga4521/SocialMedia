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

### 2.Uploading The Posts:

#### 🔧 Basic Setup

         - useState → Manage file, preview, caption, loading state.

         - useRef → Used to trigger the hidden file input.

         - useEffect → Fetch post data in Edit mode.

         - useDispatch → Dispatch Redux actions (createPosts, updatePosts).

#### 🆚 Add vs Edit Mode

         - window.location.href.includes("/editpost") → Checks if it's Edit.

         - If Edit, fetch post data using GetPostById() inside useEffect.

#### Image Upload & Preview

         - File selected → stored in file.

         - Preview shown using: URL.createObjectURL(selectedFile).

         - File removed → reset file, preview, and clear input via inputref.

#### 📝 Caption Handling

         - Text area captures caption via setCaption.

         - Caption is part of the final payload for post creation/update.

#### 📤 Form Submission Logic

         - Validate: Must have file and caption, else show toast.error.

         - Create FormData, append image file → call uploadPost().

         - Get file_url from response → set as image in payload.

         - Final payload: { text: caption, image: file_url }.

#### 🔁 Add or Edit Post (Redux)

         - dispatch(createPosts(payload)) → For new post.

         - dispatch(updatePosts({ data: payload, id })) → For editing existing post.

         - Reset states after successful upload.

#### 💡 Rendering UI

         - upload-box: Opens file picker when clicked.

         - If image exists → show preview + FaTimes to remove.

         - Else → show upload icon (FaPlus).

         - Textarea → shows and updates caption.

         - Button text = "Post" or "Edit" based on mode.

         - Button disabled when loading.

#### 🚨 Error & Success Handling

         - Uses toast for feedback (errors, success).

         - Loading state handled cleanly using setLoading.

### 3.Protected Route

         - getAuthToken() checks if the user is logged in by retrieving the token from local storage.

         - If there's no token and the route is not public, redirect the user to the /login page.

         - If there's a token and the route is public, redirect the user to the home page /.

         - If the route is private and the user is logged in, show the Navbar and the page content (children).

         - If the route is public, show only the page content (children).

         - isPublic is false by default, meaning routes are protected unless specified as public.

### 4. Context API(Auth Provider)

         - It sets up authentication context in React so that any component can access and update the logged-in user info.
         - createContext(null) → Creates a global context to hold user authentication data.

         - useAuth() → Custom hook to access the auth context from any component easily.

         - AuthProvider → Wrapper component that provides the user state to all child components.

         - useState(null) → Initializes user as null (no one logged in initially).

         - AuthContext.Provider → Supplies { user, setUser } to all nested components.
