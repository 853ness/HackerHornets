import React, { useEffect, useState } from "react";
import { gapi } from "gapi-script";

const CLIENT_ID = "385449149257-vshbif17e9p3tfr76p7n3grq9gtu9g4k.apps.googleusercontent.com";
const API_KEY = "AIzaSyCInue3efFlQ_RD2thkfpPWYpO7I11iW5Y";
const DISCOVERY_DOCS = [
  "https://classroom.googleapis.com/$discovery/rest?version=v1",
];
const SCOPES = "https://www.googleapis.com/auth/classroom.courses.readonly";

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const initClient = () => {
      gapi.client
        .init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES,
        })
        .then(() => {
          const authInstance = gapi.auth2.getAuthInstance();
          setIsSignedIn(authInstance.isSignedIn.get());
          authInstance.isSignedIn.listen(setIsSignedIn);

          if (authInstance.isSignedIn.get()) {
            listCourses();
          }
        })
        .catch((error) => console.error("Error initializing GAPI client", error));
    };

    gapi.load("client:auth2", initClient);
  }, []);

  const handleSignIn = () => {
    gapi.auth2.getAuthInstance().signIn();
  };

  const handleSignOut = () => {
    gapi.auth2.getAuthInstance().signOut();
  };

  const listCourses = () => {
    gapi.client.classroom.courses
      .list()
      .then((response) => {
        const courses = response.result.courses || [];
        setCourses(courses);
      })
      .catch((error) => console.error("Error fetching courses", error));
  };

  console.log(courses);
  return (
    <div>
      <h1>Google Classroom Integration</h1>
      {isSignedIn ? (
        <>
          <button onClick={handleSignOut}>Sign Out</button>
          <h2>Courses</h2>
          <ul>
            {courses.map((course) => (
              <li key={course.id}>{course.name}</li>
            ))}
          </ul>
        </>
      ) : (
        <button onClick={handleSignIn}>Sign In with Google</button>
      )}
    </div>
  );
}

export default App;
