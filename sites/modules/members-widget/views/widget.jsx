// Delegates to the member module's `list` async component. Hand-picked
// members arrive already loaded through the `_members` relationship.

export default function ({ widget }, { Component }) {
  return (
    <Component
      module="member"
      name="list"
      show={widget.show}
      members={widget._members}
      limit={widget.limit}
    />
  );
}
