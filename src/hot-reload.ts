import { toPromise } from '~/common';

/**
 * Recursively get all FileEntry and DirectoryEntry.
 */
async function getAllEntries(dir: DirectoryEntry) {
  const reader = dir.createReader();
  const entries = await toPromise<Entry[]>(reader.readEntries.bind(reader))();
  const result = [];
  while (entries[0]) {
    const entry = entries.shift();
    if (entry.isFile) {
      result.push(entry);
    } else {
      const subEntries = await getAllEntries(entry as DirectoryEntry);
      subEntries.forEach((e) => result.push(e));
    }
  }
  return result;
}

async function watchChanges() {
  const dir = await toPromise<DirectoryEntry>(
    chrome.runtime.getPackageDirectoryEntry
  )();
  const entries = await getAllEntries(dir);

  const modificationTimeMap: { [fullPath: string]: Date } = {};
  await Promise.all(
    entries.map((entry) =>
      toPromise<Metadata>(entry.getMetadata.bind(entry))().then(
        ({ modificationTime }) => {
          modificationTimeMap[entry.fullPath] = modificationTime;
        }
      )
    )
  );

  window.setInterval(() => {
    entries.forEach(async (entry) => {
      const metadata = await toPromise<Metadata>(
        entry.getMetadata.bind(entry)
      )();

      if (
        modificationTimeMap[entry.fullPath].getTime() !==
        metadata.modificationTime.getTime()
      ) {
        chrome.runtime.reload();
      }
    });
  }, 1000);
}

chrome.management.getSelf((self) => {
  if (self.installType === 'development') {
    console.log(`start hot reload at ${new Date().toLocaleString()}`);
    watchChanges();
  }
});
