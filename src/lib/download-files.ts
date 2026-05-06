export type DownloadFileEntry = {
  href: string;
  fileName?: string;
};

export function downloadFiles(files: DownloadFileEntry[]): void {
  if (!files.length) return;

  files.forEach((file, index) => {
    const delay = index * 220;
    window.setTimeout(() => {
      const link = document.createElement("a");
      link.href = file.href;
      if (file.fileName) link.download = file.fileName;
      link.rel = "noopener";
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      link.remove();
    }, delay);
  });
}
