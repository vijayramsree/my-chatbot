// Upload a file to the server by sending it to the endpoint /api/files. 
// It uses the FormData API to construct a request body, appending the file under the key "file". The function performs an asynchronous POST request using the fetch API.

export async function uploadFile(file: File) {
    const formData = new FormData();
    formData.append("file", file);
  
    const res = await fetch("/api/files", {
      method: "POST",
      body: formData,
    });
  
    return res;
  }