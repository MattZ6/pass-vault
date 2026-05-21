import licensesJson from "@/assets/licenses.json";

export type License = {
  key: string;
  name: string;
  version: string;
  licenses: string;
  repository: string;
  licenseUrl: string;
  parents: string;
  imageUrl: string;
};

export const licenses = Object.keys(licensesJson)
  .map((key) => {
    let name = String(key);
    let version = null;

    if (key.lastIndexOf("@") > 0) {
      name = String(key).substring(0, key.lastIndexOf("@"));
      version = `v${key.substring(key.lastIndexOf("@") + 1)}`;
    }

    let repository = String(
      licensesJson[key as keyof typeof licensesJson].repository || "",
    );

    if (repository.startsWith("github:")) {
      repository = repository.replace("github:", "https://github.com/");
    }

    const paths = repository.split("/");
    paths.pop();

    return {
      ...licensesJson[key as keyof typeof licensesJson],
      key,
      name,
      version,
      imageUrl: paths.join("/").concat(".png?size=40"),
    } as License;
  })
  .sort((previous, current) => previous.name.localeCompare(current.name));
