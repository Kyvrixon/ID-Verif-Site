import { signOut } from "next-auth/react";
import { useState } from 'react';
import styles from "../../styles/IDform.module.css";

export default function IDform({ onSubmit, isSubmitting }) {
  const [formData, setFormData] = useState({
    images: []
  });
  const [imageSize, setimageSize] = useState(null);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 1) {
      alert("Please only upload 1 image!");
      e.target.value = 0;
      return;
    };

    setimageSize(files.length);

    setFormData((prevData) => ({
      ...prevData,
      images: files
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (imageSize === 1) {
      return onSubmit(formData);
    }
    return alert("Please upload your ID!");
  };

  const handleSignout = (e) => {
    e.preventDefault();
    return signOut();
  }

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <input
            type="file"
            id="images"
            name="images"
            onChange={handleFileChange}
            className={styles.fileInput}
            accept="image/*"
            multiple
          />
        </div>
        <button
          type="submit"
          className={`${styles.submitButton} ${isSubmitting ? styles.disabled : ''}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? '🚀 Launching into space...' : 'Submit!'}
        </button>
        <button className={styles.logoutButton} onClick={handleSignout}>Log Out</button>
      </form>
      <div>
      </div>
    </>
  );
}