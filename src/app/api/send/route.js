export async function POST(request) {
  try {
    const formData = await request.formData();

    const user = {
      id: formData.get("user[id]"),
      name: formData.get("user[name]"),
      email: formData.get("user[email]"),
      code: formData.get("user[code]"),
      avatar: formData.get("user[avatar]")
    };

    const images = [];
    formData.getAll("images[]").forEach((file, index) => {
      images.push(file);
    });

    const formDataToSend = new FormData();
    formDataToSend.append("user", JSON.stringify(user));
    images.forEach((image, index) => {
      formDataToSend.append(`images[${index}]`, image);
    });

    const response = await fetch(process.env.API_URL, {
      method: 'POST',
      headers: {
        "Auth": process.env.API_KEY
      },
      body: formDataToSend
    });

    if (response.ok) {
      return new Response(null, { status: 200 });
    } else {
      return new Response(null, { status: 501 });
    }
  } catch (error) {
    console.error(error);
    return new Response(null, { status: 500 });
  }
}