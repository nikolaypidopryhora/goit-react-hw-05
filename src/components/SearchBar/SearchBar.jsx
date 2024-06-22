import { Formik, Field, Form } from "formik";
import toast, { Toaster } from "react-hot-toast";

export default function SearchBar({ onSearch }) {
  return (
    <div>
      <Formik
        initialValues={{ query: "" }}
        onSubmit={(values) => {
          if (values.query.trim() !== "") {
            onSearch(values.query);
          } else {
            toast.error("The search field is empty. Please try again!");
          }
          return;
        }}
      >
        <Form>
          <Field name="query" placeholder="Search movie"></Field>
          <button type="submit">Search</button>
        </Form>
      </Formik>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}
