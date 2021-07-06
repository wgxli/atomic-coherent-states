# Atomic Coherent States <img src="public/logo192.png" width=32 alt="App Icon">
An interactive [visualization](https://samuelj.li/atomic-coherent-states) of the stretched representation for many coupled two-level systems.

## What are atomic coherent states?
Consider many two-level quantum systems (e.g. atoms).
The state of each individual system can be expressed with a two-component vector of probability amplitudes.

By treating these vectors as two-component spinors,
we may define a pseudo-spin operator S<sub>z</sub><sup>i</sup> for each atom.
Then the Hamiltonian for each individual atom can be written as some multiple of S<sub>z</sub><sup>i</sup>.

If there is no spatial inhomogeneity in the system, and negligible (or mean-field) interactions between the atoms, then the total Hamiltonian can be written as as a multiple of the total pseudo-spin operator S<sub>z</sub> := Σ<sub>i</sub> S<sub>z</sub><sup>i</sup>.
Moreover, the pseudo-spin of the atoms can be coupled in the usual way, and then decomposed into irreducible spin representations.

The top-level (highest-spin) irrep is known as the *stretched representation*.
Since the magnitude of the spin vector is fixed in this representation, we can visualize its state as a quasi-probability distribution over a sphere.
This is what is visualized in this app.

The ground state is the lowest-S<sub>z</sub> state of the stretched representation, and the state with all atoms excited has the highest S<sub>z</sub>.
Absorbing one photon increments S<sub>z</sub>, and vice-versa.
Many common experimental techinques (e.g. Rabi/Ramsey sequences) will keep the system in the stretched representation if homogeneity is not broken, so this component of the spin decomposition is particularly useful.

See [this paper](https://journals.aps.org/pra/abstract/10.1103/PhysRevA.6.2211) for more details.
