export default function resize(ctx, width, height) {
    if (ctx === null) {return;}
    const {renderer, camera} = ctx;

    camera.aspect = width/height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
};
