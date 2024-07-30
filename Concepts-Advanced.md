# Advanced ECD Concepts

## Containment Concepts

Given an element A:

#### Children
  The elements directly contained in A but not their transitive contents.

#### Descendants
  All elements contained in A, including transitive contents.
  
#### Parent
  The direct container of A.

#### Ancestors
  Any container of A, direct or transitive.

#### Collateral
  Any element that is not a descendant nor ancestor of A.
  Term comes from biology.

## Dependency Concepts

Given an element A:

#### Own deps
  The deps from/to A, not any of its descendants.

#### Self deps
  The own deps from A to A.

#### External deps
  Deps from/to (A and its descendants) to/from another element not contained in A.

#### Internal deps
  Deps among any two of (A and its decendants).

#### Vertical deps
  Deps from/to A to/from one of its descendants or ancestors.
  It is internal for ancestor and external for the descendant.
  Suggetions for a better name than "vertical" are welcome.

#### Visible deps (on a diagram)
  The external deps of an element but not vertical deps.
