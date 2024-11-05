# Advanced [ECD](Concepts.md) Concepts

## Containment Concepts

Given an element A:

#### Children
  The elements directly contained in A but not their transitive contents.

#### Descendants
  All elements contained in A, including transitive contents.
  
#### Parent
  The direct container of A.

#### Ancestors
  All containers of A, direct or transitive.

#### Collateral
  Any element that is not a descendant nor ancestor of A.
  Term comes from biology for things like siblings, uncles, cousins, etc.

## Dependency Concepts

Given an element A:

#### Own deps
  The deps from/to A.

#### Self deps
  The own deps from A to A.

#### Internal deps
  Deps from/to A to/from any of (A and its descendants). Self deps are internal deps, therefor.

#### Contained Deps
  Deps among any two of A's descendants. They are not deps of A.

#### Boundary-Crossing or simply Crossing deps
  Deps from/to a descendant of A to/from an element not contained in A (ancestor or collateral).

#### Pertinent (Default)
  When deps are not qualified as in "A has many deps", that means pertinent deps.
  Pertinent deps are A's own and crossing deps.

#### External deps
  The pertinent deps of A that are not internal.

#### Hierarchical deps
  Deps from/to A to/from one of its descendants, ancestors or A itself.
  It is internal for the ancestor and external for the descendant.
  
#### Visible deps (on a diagram)
  The external deps of an element but not vertical deps.
