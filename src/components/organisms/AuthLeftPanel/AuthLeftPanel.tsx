import { motion } from 'framer-motion';
import RussiaMap from '@/components/organisms/RussiaMap/RussiaMap';
import '@/pages/AuthPage.css';

interface FeatureItem {
  icon: string;
  text: string;
}

interface AuthLeftPanelProps {
  features: FeatureItem[];
  onTatarstanClick?: () => void;
  showMap?: boolean;
}

function AuthLeftPanel({ features, onTatarstanClick, showMap = false }: AuthLeftPanelProps) {
  return (
    <motion.div
      className="auth-left-panel"
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="logo-container">
        <motion.div
          className="map-wrapper"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <RussiaMap onTatarstanClick={onTatarstanClick} isActive={showMap} />
        </motion.div>

        <motion.h1
          className="year-title"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          <motion.span
            className="title-gradient"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            АТЛАС НАРОДОВ
          </motion.span>
          <br />
          <span className="title-green">ТАТАРСТАНА</span>
        </motion.h1>

        <motion.p
          className="tagline"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Платформа для изучения этнокультурного разнообразия региона
        </motion.p>

        <motion.div
          className="features"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={`feature-${index}`}
              className="feature-item"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
              whileHover={{ scale: 1.02, x: 6 }}
            >
              <span className="feature-icon">{feature.icon}</span>
              <span className="feature-text">{feature.text}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default AuthLeftPanel;
