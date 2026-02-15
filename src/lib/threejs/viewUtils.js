import { Vector3 } from 'three';

/**
 * Updates the camera position and orbit controls to a predefined view.
 * @param {THREE.Camera} camera The camera to update.
 * @param {OrbitControls} controls The orbit controls to update.
 * @param {'front' | 'back' | 'up' | 'down'} view The view to set.
 */
export const updateCameraView = (camera, controls, view) => {
    if (!camera || !controls) return;

    // Calculate distance based on current camera distance
    const distance = camera.position.length() || 5;
    const target = new Vector3(0, 0, 0);

    switch (view) {
        case 'front':
            camera.position.set(0, 0, distance);
            break;
        case 'back':
            camera.position.set(0, 0, -distance);
            break;
        case 'up':
            camera.position.set(0, distance, 0);
            break;
        case 'down':
            camera.position.set(0, -distance, 0);
            break;
        default:
            break;
    }

    camera.lookAt(target);
    controls.target.copy(target);
    controls.update();
};
