/**
 * 아직 채우지 않은 자리.
 * DB 값이 비어 있으면 [ 안내 문구 ] 형태로 보여 주고,
 * 값이 들어오면 그대로 그 값을 보여 줍니다.
 */
export function Filled({
  value,
  placeholder,
  className = "",
}: {
  value?: string | null;
  placeholder: string;
  className?: string;
}) {
  const text = value?.trim();
  if (text) return <span className={className}>{text}</span>;
  return (
    <span className={`text-muted ${className}`}>{`[ ${placeholder} ]`}</span>
  );
}

export function BlankBox({
  value,
  placeholder,
  label,
  className = "",
}: {
  value?: string | null;
  placeholder: string;
  label?: string;
  className?: string;
}) {
  const text = value?.trim();

  if (text) {
    return (
      <p className={`text-sm leading-[1.9] text-body ${className}`}>{text}</p>
    );
  }

  return (
    <div className={`blank px-5 py-4 ${className}`}>
      {label && (
        <div className="text-[10px] tracking-[0.26em] text-muted">{label}</div>
      )}
      <p className="mt-2 text-sm leading-[1.9] text-muted">{`[ ${placeholder} ]`}</p>
    </div>
  );
}
