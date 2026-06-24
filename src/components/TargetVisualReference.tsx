type TargetVisualReferenceProps = {
  variant?: string;
  title?: string;
  description?: string;
};

function HouseReference() {
  return (
    <svg viewBox="0 0 420 300" role="img" aria-label="Referência visual de uma casa" className="target-reference-svg">
      <rect width="420" height="300" rx="22" className="target-bg" />
      <line x1="38" y1="252" x2="382" y2="252" className="target-ground" />
      <rect x="112" y="144" width="170" height="98" rx="10" className="target-house-body" />
      <polygon points="88,144 197,62 306,144" className="target-roof" />
      <rect x="184" y="189" width="42" height="53" rx="5" className="target-door" />
      <rect x="134" y="170" width="34" height="30" rx="5" className="target-window" />
      <rect x="238" y="170" width="34" height="30" rx="5" className="target-window" />
      <circle cx="340" cy="60" r="30" className="target-sun" />
    </svg>
  );
}

function TreeSunReference() {
  return (
    <svg viewBox="0 0 420 300" role="img" aria-label="Referência visual de uma árvore com sol" className="target-reference-svg">
      <rect width="420" height="300" rx="22" className="target-bg" />
      <line x1="36" y1="252" x2="384" y2="252" className="target-ground" />
      <circle cx="338" cy="64" r="38" className="target-sun" />
      <rect x="185" y="164" width="40" height="88" rx="8" className="target-tree-trunk" />
      <circle cx="205" cy="128" r="62" className="target-tree" />
      <circle cx="165" cy="144" r="42" className="target-tree-light" />
      <circle cx="245" cy="146" r="42" className="target-tree-light" />
    </svg>
  );
}

function CarReference() {
  return (
    <svg viewBox="0 0 420 300" role="img" aria-label="Referência visual de um carro" className="target-reference-svg">
      <rect width="420" height="300" rx="22" className="target-bg" />
      <line x1="38" y1="252" x2="382" y2="252" className="target-road" />
      <rect x="98" y="166" width="224" height="62" rx="14" className="target-car-body" />
      <rect x="158" y="120" width="112" height="55" rx="10" className="target-car-cabin" />
      <rect x="172" y="132" width="35" height="28" rx="5" className="target-car-window" />
      <rect x="218" y="132" width="35" height="28" rx="5" className="target-car-window" />
      <circle cx="148" cy="235" r="28" className="target-wheel" />
      <circle cx="276" cy="235" r="28" className="target-wheel" />
      <circle cx="148" cy="235" r="12" className="target-wheel-core" />
      <circle cx="276" cy="235" r="12" className="target-wheel-core" />
    </svg>
  );
}

function NeighborhoodReference() {
  return (
    <svg viewBox="0 0 420 300" role="img" aria-label="Referência visual de uma cena com casa, árvore, sol e chão" className="target-reference-svg">
      <rect width="420" height="300" rx="22" className="target-bg" />
      <circle cx="340" cy="58" r="34" className="target-sun" />
      <line x1="30" y1="252" x2="390" y2="252" className="target-ground" />
      <rect x="70" y="154" width="150" height="88" rx="10" className="target-house-body" />
      <polygon points="52,154 145,82 238,154" className="target-roof" />
      <rect x="132" y="195" width="38" height="47" rx="5" className="target-door" />
      <rect x="89" y="174" width="32" height="27" rx="5" className="target-window" />
      <rect x="272" y="172" width="34" height="80" rx="7" className="target-tree-trunk" />
      <circle cx="289" cy="135" r="52" className="target-tree" />
      <circle cx="255" cy="148" r="34" className="target-tree-light" />
      <circle cx="324" cy="148" r="34" className="target-tree-light" />
    </svg>
  );
}

const REFERENCE_COMPONENTS: Record<string, () => JSX.Element> = {
  house: HouseReference,
  tree_sun: TreeSunReference,
  car: CarReference,
  neighborhood: NeighborhoodReference,
};

export function TargetVisualReference({ variant = 'neighborhood', title, description }: TargetVisualReferenceProps) {
  const Component = REFERENCE_COMPONENTS[variant] ?? NeighborhoodReference;

  return (
    <div className="target-reference-card" aria-label="Imagem de referência do desafio">
      <div className="target-reference-media"><Component /></div>
      <div className="target-reference-caption">
        <strong>{title ?? 'Imagem de referência'}</strong>
        {description && <span>{description}</span>}
      </div>
    </div>
  );
}
