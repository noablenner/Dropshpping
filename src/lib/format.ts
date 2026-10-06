const formateurPrix = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR',
});

export function formaterPrix(centimes: number): string {
  return formateurPrix.format(centimes / 100);
}

export function formaterCm(valeur: number | null): string {
  return valeur === null ? 'non communiqué' : `${valeur} cm`;
}
