export function Kpi({ title, value }) {
  return (
    <div className="flex flex-col items-center justify-center p-6 w-56 text-left">
      <p className="text-4xl font-bold text-[var(--branco)]">{value}</p>
      <p className="text-sm  mb-4 text-[var(--branco)]">{title}</p>
    </div>
  );
}
export default Kpi;
