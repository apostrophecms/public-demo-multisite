// A row of headline numbers. `_value` is filled in by the module's `load`.

export default function ({ widget, locale }) {
  const numbers = new Intl.NumberFormat(locale || 'en');
  return (
    <div className="widget association-stats-widget">
      {(widget.stats || []).map((stat) => (
        <div className="association-stat">
          <span className="association-stat__value">
            {typeof stat._value === 'number' ? numbers.format(stat._value) : (stat._value || '–')}
          </span>
          <span className="association-stat__label">{stat.label}</span>
        </div>
      ))}
    </div>
  );
}
