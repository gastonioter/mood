const createURL = (path: string) => {
  return window.location.origin + path;
};

export const createNewEntry = async () => {
  const response = await fetch(new Request(createURL("/api/journal")), {
    method: "POST",
  });

  console.log(response);

  if (response.ok) {
    const data = await response.json();
    return data.data;
  }
};

export const updateEntry = async ({
  id,
  content,
}: {
  id: string;
  content: string;
}) => {
  const body = {
    content,
  };
  const response = await fetch(
    new Request(createURL(`/api/journal/${id}`), {
      method: "PATCH",
      body: JSON.stringify(body),
    })
  );
  if (response.ok) {
    const data = await response.json();
    return data.data;
  }
};
