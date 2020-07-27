export default function Footer() {
  return (
    <footer>
      <p>
        Built by <a href="https://www.marinamilete.com">Marina Milette</a> using
        the <a href="https://pokemontcg.io/">Pokémon TCG API</a>
      </p>
      <p>
        <a href="https://github.com/Avalai/pokemontcg-backup">View on GitHub</a>
      </p>

      <style jsx>{`
        footer {
          width: 100%;
          border-top: 1px solid #eaeaea;
          padding: 2em;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          color: 0070f3;
          text-decoration: underline;
        }
      `}</style>
    </footer>
  )
}
