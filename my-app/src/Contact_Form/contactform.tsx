import submitForm from "./submitForm.tsx";

export default function App() {
  return (
    <form
     action="https://questions.greatfrontend.com/api/questions/contact-form"
      method="POST"
      
      // Ignore the onSubmit prop, it's used by GFE to
      // intercept the form submit event to check your solution.
      onSubmit={submitForm}
    >
      <div>
        <label>
          Name:
          <input type="text" name="name"/>
        </label>
      </div>

      {/* Email field */}
      <div>
        <label>
          Email:
          <input type="email" name="email" />
        </label>
      </div>

      {/* Message field */}
      <div>
        <label>
          Message:
          <textarea name="message"></textarea>
        </label>
      </div>

   
      <button type="submit">Send</button>
    </form>
  );
}