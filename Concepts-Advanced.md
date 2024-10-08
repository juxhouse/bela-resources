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

#### External deps
  Deps from/to (A and its descendants) to/from another element not contained in A.

#### Internal deps
  Deps among any two of (A and its descendants).

#### Contained Deps
  Deps among any two of A's descendants.

#### Vertical deps
  Deps from/to A to/from one of its descendants or ancestors.
  It is internal for the ancestor and external for the descendant.
  Suggestions for a better name than "vertical" are welcome.

#### Visible deps (on a diagram)
  The external deps of an element but not vertical deps.
