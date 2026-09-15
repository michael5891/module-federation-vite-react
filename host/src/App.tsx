import { lazy, Suspense, useEffect, useState } from 'react';
import { of, tap } from 'rxjs';
import './App.css';
import Counter from './components/Counter';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ThemeProvider, type Theme, useTheme } from '@demo/design-system';

const Remote = lazy(
  // @ts-ignore
  async () => import('remote/remote-app'),
);

const hostThemes = {
  midnight: {
    name: 'Midnight',
    surface: '#1f2124',
    text: '#ffffff',
    accent: '#f6b352',
    accentText: '#181818',
  },
  daylight: {
    name: 'Daylight',
    surface: '#e8f1ff',
    text: '#172554',
    accent: '#1d4ed8',
    accentText: '#ffffff',
  },
} satisfies Record<string, Theme>;

type HostThemeName = keyof typeof hostThemes;

const HostCard = ({
  onToggleTheme,
  nextThemeName,
}: {
  onToggleTheme: () => void;
  nextThemeName: HostThemeName;
}) => {
  const theme = useTheme();

  console.log('Host theme:', theme);

  return (
    <div className="host">
      <div className="card" style={{ background: theme.surface, color: theme.text }}>
        <div className="icon">
          <svg enableBackground="new 0 0 512 512" height="512px" id="Layer_1" version="1.1" viewBox="0 0 512 512" width="512px" xmlns="http://www.w3.org/2000/svg">
            <path d="M316.01,199.02L256.134,14.817L196.239,199.02H1.134l158.102,113.324L98.53,496.487l157.604-114.232  l157.585,114.232l-60.687-184.143L511.134,199.02H316.01z M335.084,318.257l42.407,128.63L267.22,366.963l-11.086-8.033  l-11.086,8.033l-110.291,79.923l42.408-128.63l4.353-13.18l-11.289-8.08L59.903,217.909h136.336h13.724l4.242-13.051l41.929-128.957  l41.91,128.957l4.242,13.051h13.724h136.336l-110.327,79.088l-11.27,8.08L335.084,318.257z" fill="#37404D" />
          </svg>
        </div>
        <div className="title">I'm the host app</div>
        <div>Theme: {theme.name}</div>
        <button
          type="button"
          onClick={onToggleTheme}
          style={{ border: 0, marginTop: '10px', backgroundColor: theme.accent, borderRadius: '.25rem', fontWeight: 700, padding: '.5rem 1rem', color: theme.accentText }}
        >
          Switch to {hostThemes[nextThemeName].name}
        </button>
        <Counter />
      </div>
    </div>
  );
};

export default () => {
  const [themeName, setThemeName] = useState<HostThemeName>('midnight');
  const nextThemeName = themeName === 'midnight' ? 'daylight' : 'midnight';

  useEffect(() => {
    of('emit').pipe(tap(() => console.log("I'm RxJs from host"))).subscribe();
  }, []);

  return (
    <ThemeProvider theme={hostThemes[themeName]}>
      <HostCard nextThemeName={nextThemeName} onToggleTheme={() => setThemeName(nextThemeName)} />
      <ErrorBoundary>
        <Suspense fallback="loading...">
          <Remote />
        </Suspense>
      </ErrorBoundary>
    </ThemeProvider>
  );
};
