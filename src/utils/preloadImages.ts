export const preloadImages = (selector = '.grid__item-image') =>
  new Promise<void>((resolve) => {
    const images = Array.from(document.querySelectorAll(selector)) as HTMLElement[];
    const urls = images
      .map((el) => {
        const bg = window.getComputedStyle(el).backgroundImage;
        const match = /url\(["']?(.*?)["']?\)/.exec(bg);
        return match ? match[1] : null;
      })
      .filter(Boolean) as string[];

    let loaded = 0;
    if (!urls.length) return resolve();
    urls.forEach((url) => {
      const img = new Image();
      img.src = url.startsWith('/') ? url : url;
      img.onload = img.onerror = () => {
        loaded++;
        if (loaded >= urls.length) resolve();
      };
    });
  });
