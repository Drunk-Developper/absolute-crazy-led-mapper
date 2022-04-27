# Mapping software

# Process

## Préparation

1. Dessiner la structure pour faire un masque. Chaque ligne représente un strip, chaque pixel encode en binaire (dans la couleur) la position de la led la séquence du strip.
2. Process le masque pour mettre tous les pixels dans l'ordre en codant leur ancienne position dans la couleur. (on renverse les positions et la data)

## Runtime (en boucle)

4. On applique le masque à un shader glsl pour aller chercher la couleur target de chaque pixel à la position encodée par la couleur du pixel du masque.
5. On récupère un array en sortie du shader qui contient les couleurs à envoyer au strip dans le bon ordre.
6. On encode cet array en message artnet qu'on envoi sur le réseau
