// "Marketing is not seven services. It's one system." — the five-node
// attract → engage → convert → measure → improve map. Server component;
// only the kinetic headline word is interactive.
import KineticWord from "./KineticWord";

export default function SystemMap({ system }) {
  return (
    <section className="system">
      <div className="container">
        <div className="system-intro">
          <div>
            <div className="eyebrow accent">{system.eyebrow}</div>
            <h2>
              {system.headingBefore} <KineticWord>{system.headingKinetic}</KineticWord>
            </h2>
          </div>
          <p>{system.description}</p>
        </div>
        <div className="system-map">
          {system.nodes.map((node) => (
            <div className="node" key={node.num}>
              <small>{node.num}</small>
              <h3>{node.title}</h3>
              <p>{node.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
