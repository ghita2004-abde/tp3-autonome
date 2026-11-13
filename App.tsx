import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from 'react-native';

type Evenement = {
  id: string;
  titre: string;
  categorie: string;
  capacite: number;
  inscrits: number;
};

const evenements: Evenement[] = [
  {
    id: 'E01',
    titre: 'Atelier React',
    categorie: 'Atelier',
    capacite: 25,
    inscrits: 25,
  },
  {
    id: 'E02',
    titre: 'Conférence IA',
    categorie: 'Conférence',
    capacite: 70,
    inscrits: 52,
  },
  {
    id: 'E03',
    titre: 'Sécurité mobile',
    categorie: 'Atelier',
    capacite: 20,
    inscrits: 17,
  },
  {
    id: 'E04',
    titre: 'Design UI',
    categorie: 'Atelier',
    capacite: 18,
    inscrits: 9,
  },
  {
    id: 'E05',
    titre: 'Forum projets',
    categorie: 'Rencontre',
    capacite: 50,
    inscrits: 49,
  },
  {
    id: 'E06',
    titre: 'Découverte Git',
    categorie: 'Atelier',
    capacite: 24,
    inscrits: 24,
  },
];

function placesRestantes(e: Evenement): number {
  return Math.max(0, e.capacite - e.inscrits);
}

function statutEvenement(e: Evenement): string {
  const places = placesRestantes(e);

  if (places === 0) {
    return 'Complet';
  } else if (places <= 3) {
    return 'Presque complet';
  } else {
    return 'Ouvert';
  }
}

const totalEvenements = evenements.length;

const evenementsComplets = evenements.filter(
  e => placesRestantes(e) === 0
).length;

const evenementsDisponibles = evenements.filter(
  e => placesRestantes(e) > 0
).length;

const totalPlaces = evenements.reduce(
  (total, e) => total + placesRestantes(e),
  0
);

const ateliersDisponibles = evenements.filter(
  e => e.categorie === 'Atelier' && placesRestantes(e) > 0
);

type BadgeEtatProps = {
  statut: string;
};

function BadgeEtat({ statut }: BadgeEtatProps) {
  let couleur = '';

  if (statut === 'Complet') {
    couleur = '#FECACA';
  } else if (statut === 'Presque complet') {
    couleur = '#FED7AA';
  } else {
    couleur = '#BBF7D0';
  }

  return (
    <Text style={[styles.badge, { backgroundColor: couleur }]}>
      {statut}
    </Text>
  );
}

type CarteEvenementProps = {
  evenement: Evenement;
};

function CarteEvenement({ evenement }: CarteEvenementProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.titre}>
        {evenement.titre}
      </Text>

      <Text style={styles.info}>
        Catégorie : {evenement.categorie}
      </Text>

      <Text style={styles.info}>
        Places restantes : {placesRestantes(evenement)}
      </Text>

      <BadgeEtat statut={statutEvenement(evenement)} />
    </View>
  );
}

type BlocStatistiqueProps = {
  titre: string;
  valeur: number;
};

function BlocStatistique({ titre, valeur }: BlocStatistiqueProps) {
  return (
    <View style={styles.statistique}>
      <Text style={styles.statTitre}>{titre}</Text>
      <Text style={styles.valeur}>{valeur}</Text>
    </View>
  );
}

const mode = 'tous';

const evenementsAffiches =
  mode === 'tous' ? evenements : ateliersDisponibles;

// 11. Interface principale
export default function App() {
  return (
    <View style={styles.container}>

      <Text style={styles.header}>
        CampusAgenda
      </Text>

      <Text style={styles.sousTitre}>
        Événements du campus
      </Text>

      <View style={styles.statsContainer}>
        <BlocStatistique
          titre="Total événements"
          valeur={totalEvenements}
        />

        <BlocStatistique
          titre="Événements complets"
          valeur={evenementsComplets}
        />

        <BlocStatistique
          titre="Événements disponibles"
          valeur={evenementsDisponibles}
        />

        <BlocStatistique
          titre="Places restantes"
          valeur={totalPlaces}
        />
      </View>

      <Text style={styles.sectionTitle}>
        {mode === 'tous'
          ? 'Tous les événements'
          : 'Ateliers disponibles'}
      </Text>

      <FlatList
        data={evenementsAffiches}
        renderItem={({ item }) => (
          <CarteEvenement evenement={item} />
        )}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.empty}>
            Aucun événement disponible.
          </Text>
        }
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 45,
    backgroundColor: '#F5F7FA',
  },

  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2563EB',
    marginBottom: 5,
  },

  sousTitre: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 20,
  },

  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },

  statistique: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 12,
    margin: 5,
    flex: 1,
    minWidth: '42%',
  },

  statTitre: {
    fontSize: 13,
    color: '#666666',
  },

  valeur: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 5,
    color: '#2563EB',
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },

  card: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    marginVertical: 8,
    borderRadius: 12,
    elevation: 2,
  },

  titre: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  info: {
    fontSize: 14,
    color: '#555555',
    marginBottom: 5,
  },

  badge: {
    padding: 8,
    borderRadius: 10,
    overflow: 'hidden',
    alignSelf: 'flex-start',
    marginTop: 5,
  },

  empty: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 16,
    color: '#666666',
  },
});