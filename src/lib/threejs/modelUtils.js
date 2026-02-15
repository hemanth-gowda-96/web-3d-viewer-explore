import { LoadingManager } from 'three';

/**
 * Creates a THREE.LoadingManager that resolves relative paths using a fileMap.
 * @param {Map<string, string>} fileMap Map of filenames to Object URLs.
 * @returns {THREE.LoadingManager} The configured LoadingManager.
 */
export const createModelLoadingManager = (fileMap) => {
    const manager = new LoadingManager();

    manager.setURLModifier((url) => {
        // url is the relative path found in the gltf (e.g., "PartDesignExample-Body.bin")
        // We check if it's in our fileMap
        const fileName = url.split('/').pop();
        if (fileMap && fileMap.has(fileName)) {
            return fileMap.get(fileName);
        }
        return url;
    });

    return manager;
};
