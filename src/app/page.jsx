"use client";

import IDform from "@/app/components/IDform";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
//import Swal from "sweetalert2";
//import withReactContent from "sweetalert2-react-content"; // For react integration with SweetAlert2
import styles from "../styles/page.module.css";

//const MySwal = withReactContent(Swal);

export default function Home() {
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated";
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  //const [joinServer, setJoinServer] = useState(false);

  // useEffect(() => {
  //   const storedJoinServer = localStorage.getItem("joinServer");
  //   if (storedJoinServer) {
  //     setJoinServer(JSON.parse(storedJoinServer));
  //   }
  // }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    return signIn("discord");
  }

  //        I might use this idk
  //
  // const handleLogin = async () => {
  //   await MySwal.fire({
  //     icon: "question",
  //     title: "Join our support server?\n🥺\n👉👈",
  //     text: "Keep up to date with everything, enter giveaways (including nitro), chill with the community and more!",
  //     background: "#333",
  //     color: "#fff",
  //     showDenyButton: true,
  //     confirmButtonText: "Yes",
  //     confirmButtonColor: "green",
  //     denyButtonText: "No",
  //     denyButtonColor: "red"
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       MySwal.fire({
  //         icon: "success",
  //         title: "Awesome!",
  //         text: "Thankyou for joining! You will be redirected to login when you press the button!",
  //         background: "#333",
  //         color: "#fff",
  //         confirmButtonColor: "grey",
  //         confirmButtonText: "🥳",
  //       }).then(() => {
  //         setJoinServer(true)
  //         return signIn("discord");
  //       });
  //     } else if (result.isDenied) {
  //       MySwal.fire({
  //         icon: "success",
  //         title: "Aw, that's okay!",
  //         text: "You will be redirected to login when you press the button!",
  //         background: "#333",
  //         color: "#fff",
  //         confirmButtonColor: "grey",
  //         confirmButtonText: "Login to Discord",
  //       }).then(() => {
  //         setJoinServer(false)
  //         return signIn("discord");
  //       });
  //     }
  //   });
  // }

  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);
    setSubmissionStatus(null);

    const formDataToSend = new FormData();
    formDataToSend.append("user[id]", session.user.profile.id);
    formDataToSend.append("user[name]", session.user.profile.username);
    formDataToSend.append("user[email]", session.user.profile.email);
    formDataToSend.append("user[code]", session.user.profile.code);
    formDataToSend.append("user[avatar]", `https://cdn.discordapp.com/avatars/${session.user.profile.id}/${session.user.profile.avatar}.png`);

    formData.images.forEach((file, index) => {
      formDataToSend.append(`images[]`, file);
    });

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        setSubmissionStatus(
          `<p>You will receive an email from <strong>team@kyvrixon.dev</strong> within the next 24h on the status of your verification!<br /><br /><i><strong>Note:</strong> The email will be sent to the address associated with your account (${session.user.profile.email}). Please keep a copy of your reference number below for your records. Please check your spam and junk folders for our email if it doesn't appear in your inbox within 24h</i><br /><br /><strong>Reference Code:</strong> ${session.user.profile.code}</p>`
        );
      } else {
        setSubmissionStatus(`Something went wrong: Request failed.`);
      }
    } catch (error) {
      setSubmissionStatus(`Something went wrong: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <>
        <main className={styles.main}>
          <h1 className={styles.title}>Verify your identity</h1>
          <p className={styles.mainDesc}>
            By logging in below you accept our <br />
            <a className={styles.mainLink} href="https://kyvrixon.dev/posts/legal" target="_blank">Terms & Conditions</a>
          </p>
          <button className={styles.loginButton} onClick={handleLogin}>
            Login
          </button>

          {/* {!joinServer && (
            <h5 className={styles.checkboxLabel}>
              (recommended)
              <br />
              Join the support server
            </h5>
          )}

          <div className={styles.checkboxContainer}>
            <input
              type="checkbox"
              className={styles.checkbox}
              checked={joinServer}
              onChange={handleCheckbox}
              id="coolCheckbox"
            />
            <label htmlFor="coolCheckbox" className={styles.checkboxLabel}>
              {joinServer ? "💖 Thank you for wanting to join!" : "Click me!"}
            </label>
          </div> */}

        </main>
        <footer className={styles.footerFixed}>
          © 2025 Kyvrixon Development
        </footer>
      </>
    );
  }

  return (
    <>
      <main className={styles.main}>
        {!submissionStatus ? (
          <>
            <div className={styles.appealFormContainer}>
              <h2>ID Verification</h2>

              <div className={styles.userInfo}>
                <img
                  src={`https://cdn.discordapp.com/avatars/${session.user.profile.id}/${session.user.profile.avatar}.png`}
                  alt="Profile Picture"
                  className={styles.profilePic}
                />
                <p>
                  Logged in as: <br />
                  @{session.user.profile.username}
                </p>
              </div>

              <div>
                <p>Please follow the directions below:</p>
                <br />
                Ensure your DOB, full name and photo is clearly visible. You can cover other sensitive information.
              </div>

              <div>
                <IDform onSubmit={handleFormSubmit} isSubmitting={isSubmitting} />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className={styles.appealFormContainer}>
              <h2>Thank you for submitting your ID!</h2>
              <div className={styles.userInfo}>
                <div
                  dangerouslySetInnerHTML={{ __html: submissionStatus }}
                />
              </div>

              <button
                className={styles.logoutButton}
                onClick={signOut}
              >
                Log Out
              </button>
            </div>
          </>
        )}
      </main>
      <footer className={styles.footerFixed}>
        © 2025 Kyvrixon Development
      </footer>
    </>
  );
}