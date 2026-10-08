import styles from './SourceChip.module.css';

type Confidence = 'high' | 'medium' | 'low';

interface Props {
  source: string;
  confidence?: Confidence;
  href?: string;
}

const confidenceLabel: Record<Confidence, string> = {
  high:   '●●●',
  medium: '●●○',
  low:    '●○○',
};

export default function SourceChip({ source, confidence, href }: Props) {
  const inner = (
    <span className={[styles.chip, confidence ? styles[confidence] : ''].join(' ')}>
      <span className={styles.source}>{source}</span>
      {confidence && (
        <span className={[styles.confidence, styles[`conf_${confidence}`]].join(' ')} title={`Confidence: ${confidence}`}>
          {confidenceLabel[confidence]}
        </span>
      )}
    </span>
  );

  return href ? (
    <a href={href} target="_blank" rel="noreferrer" className={styles.link}>{inner}</a>
  ) : inner;
}
