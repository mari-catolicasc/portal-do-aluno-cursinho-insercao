package pt.cursinhoinsercao.portalaluno.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import pt.cursinhoinsercao.portalaluno.entity.Usuario;

import java.security.Key;
import java.util.Date;

public class TokenService {

    //Esse modelo de Token eu peguei de um canal do youtube ensinando de uma forma boa a utilizar e validar nas funções

    private static final Key CHAVE_SECRETA = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    private static final long TEMPO_EXPIRACAO = 3600000; // 1 hora

    public String gerarToken(Usuario usuario) {
        Date agora = new Date();
        Date dataExpiracao = new Date(agora.getTime() + TEMPO_EXPIRACAO);

        return Jwts.builder()
                .setIssuer("Portal Aluno API")
                .setSubject(Integer.toString(usuario.getId()))
                .claim("nome", usuario.getNome())
                .claim("tipo", usuario.getTipo())
                .setIssuedAt(agora)
                .setExpiration(dataExpiracao)
                .signWith(CHAVE_SECRETA)
                .compact();
    }

    public Claims validarToken(String token) throws Exception {
        return Jwts.parserBuilder()
                .setSigningKey(CHAVE_SECRETA) // Usa a mesma chave para verificar a assinatura
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
